## Run the send and receive apps:

```
oc new-app --name=send aliscott/nodejs-rabbitmq:send
oc new-app --name=receive aliscott/nodejs-rabbitmq:receive
```

## Run the debug pod

```
oc run -it debug --image=aliscott/debug --command -- /bin/bash
```

And then run:

```
nc -z -v -w60 rabbitmq 5671
```
