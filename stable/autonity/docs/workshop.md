# Workshop

Setup 4 independent environments for `validators Nodes`: 2 on `GKE` and 2 in `Amazon EKS`


## AWS EKS
* Deploy cluster
* Deploy workers EC2 instances with Elastic IP
* Add rules to accept `incomming` `tcp`  connections to `dst` port `30303` for aws security groups for this node
* Add External Public IP that we will use for validator node to k8s node labels
    ```shell script
    # Get node list and public IPs
    kubectl get nodes -o wide
    # Label node
    kubectl label node ip-10-6-0-243.eu-west-1.compute.internal ext_ip=X.X.X.X
    ```
* Install
    ```shell script
    helm install --name ap-test --namespace ap-test ./ --set aws.validator_0.ext_ip="X.X.X.X"
    ```


## GKE
* Deploy cluster
* Deploy workers
* Install
    ```shell script
    helm install --name ap-test --namespace ap-test ./
    ```
  
