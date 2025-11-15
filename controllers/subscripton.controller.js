import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) =>{
    try {
        const subscription = await Subscription.create({
            // Spread all enumerable own properties from req.body into this object.
            ...req.body,
            // Explicitly set `user` to the id of the currently authenticated user.
            user: req.user._id,
        });

        // trigger workflow
        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        });

        res.status(201).json({
            success: true,
            data: {subscription, workflowRunId}
        })
    } catch(error){
        next(error);
    }
}

export const getUserSubscriptions = async(req, res, next) =>{
    try{
        //Check if the user is same as the one in the token
        if(req.user.id != req.params.id){
            const error = new Error("You are not owner of this account.");
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({
            success: true,
            data: subscriptions
        })
    }catch(error){
        next(error);
    }
}

export const deleteSubscription = async (req, res, next) =>{
    try{
        // Find the subscription by id
        const subscription = await Subscription.findById(req.params.id);

        // if there is no subscription
        if(!subscription){
            const error = new Error ("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // Check ownership, only the subscription’s owner can delete it
        if (subscription.user.toString() !== req.user.id) {
            const error = new Error("You are not authorized to delete this subscription.");
            error.status = 401;
            throw error;
        }

        // delete the subscription
        await subscription.deleteOne();


        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully"
        })

    } catch(error){
        next(error);
    }
}