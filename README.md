# FluxEcoUiStateBroadcaster

The FluxEcoUiStateBroadcaster is a component for managing state changes and broadcasting those changes to subscribers.
It can be used in any web application that requires state synchronization.

## Usage

Here is an example of how to use FluxEcoUiStateBroadcaster:

``` javascript
import {FluxEcoUiStateBroadcasterApi} from "(...)/flux-eco-ui-state-broadcaster/src/Adapters/Api/FluxEcoUiStateBroadcasterApi.mjs";

const broadcaster = await FluxEcoUiStateBroadcasterApi.new();

const subscriber1 = (data) => {
    console.log('Subscriber 1:', data);
};

const subscriber2 = (data) => {
    console.log('Subscriber 2:', data);
};

broadcaster.subscribe('subscriberId1', 'exampleStateId', subscriber1);
broadcaster.subscribe('subscriberId2', 'exampleStateId', subscriber2);

const oldState = { name: 'John' };
const newState = { name: 'Jane' };
broadcaster.publish('exampleStateId', oldState, newState);

broadcaster.unsubscribe('subscriberId1', 'exampleStateId');
broadcaster.unsubscribe('subscriberId2', 'exampleStateId');

```
In the above example, we first create a new instance of FluxEcoUiStateBroadcasterApi. 
We then define two subscriber functions, **subscriber1** and **subscriber2**. 
We subscribe both of these functions to the example state change event with state id **exampleStateId**. 
We then publish a new state change event with the example id **exampleStateId**, the **old** and the **new state data**. 
Finally, we unsubscribe both subscribers from the example state change event of the state with id **exampleStateId**.