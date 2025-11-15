import dayjs from "dayjs";
// Enable CommonJS-style `require` inside an ES module
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";


const REMINDERS = [7, 5, 2, 1];
export const sendReminders = serve( async (context) => {
    // extract subscription ID
    const { subscriptionId } = context.requestPayload;
    // fetch details about the subscription
    const subscription = await fetchSubscription(context, subscriptionId)

    // if there is no subscription then exit out of this function
    if(!subscription || subscription.status !== "active") return;

    // figure out the renewal date
    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId} . Stopping workflow.`);
        return;
    }

    for(const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, "day");

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }

        if (dayjs().isSame(reminderDate, 'day')) {
            // trigger reminder
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
        }
        
    }

});


// fetchSubscription function
const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get subscription", async () => {
        return Subscription.findById(subscriptionId).populate("user", "name email");
    })
}


// sleep function
const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

// trigger function
const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () =>{
        console.log(`Triggering ${label} reminder`);
        // Send email, sms, push notificaiton
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription,
        })
    })
}
