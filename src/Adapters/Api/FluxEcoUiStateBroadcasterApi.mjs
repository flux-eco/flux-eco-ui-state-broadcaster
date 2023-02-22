export class FluxEcoUiStateBroadcasterApi {
    #subscriptions;
    #onPublishLoggers;

    constructor() {
        this.#subscriptions = new Map();
        this.#onPublishLoggers = new Map();
    }

    /**
     *
     * @return {Promise<FluxEcoUiStateBroadcasterApi>}
     */
    static async new() {
        return new FluxEcoUiStateBroadcasterApi();
    }


    #getStateChangedSubscriptionId(subscriberId, idPath) {
        return [subscriberId, this.#getStateChangedChannelPath(idPath)].join(':');
    }

    /**
     * @param {string} idPath
     * @return {string}
     */
    #getStateChangedChannelPath(idPath) {
        return [idPath, "stateChanged"].join('/');
    }

    /**
     *
     * @param {string} subscriberId
     * @param {string} idPath
     * @param callback
     */
    subscribe(subscriberId, idPath, callback) {
        const subscriptionId = this.#getStateChangedSubscriptionId(subscriberId, idPath);
        const channel = new BroadcastChannel(this.#getStateChangedChannelPath(idPath));
        channel.addEventListener('message', (event) => callback(event.data));
        this.#subscriptions.set(subscriptionId, channel);
    }

    /**
     * @param {string} loggerId
     * @param callback
     */
    registerOnPublishLogger(loggerId, callback) {
        this.#onPublishLoggers.set(loggerId, callback);
    }

    /**
     * @param {string} loggerId
     */
    unregisterOnPublishLogger(loggerId) {
        this.#onPublishLoggers.delete(loggerId);
    }

    /**
     *
     * @param {string} subscriberId
     * @param {string} idPath
     */
    unsubscribe(subscriberId, idPath) {
        const subscriptionId = this.#getStateChangedSubscriptionId(subscriberId, idPath);
        if (this.#subscriptions.has(subscriptionId)) {
            this.#subscriptions.get(subscriptionId).close();
            this.#subscriptions.delete(subscriptionId);
        }
    }

    publish(idPath, newState, oldState) {
        if (this.#onPublishLoggers.size) {
            this.#onPublishLoggers.forEach(onPublishLoggerCallback => {
                onPublishLoggerCallback(idPath, newState, oldState)
            });
        }

        const channel = new BroadcastChannel(this.#getStateChangedChannelPath(idPath));
        channel.postMessage({newState: newState, oldState: oldState})
    }
}