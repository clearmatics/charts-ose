# Join new Autonoty node to existent network

Deploy new Autonity node client and join to existent network that was deployed at previous
[Initial ceremony workshop](./workshop_initial_ceremony.md)
 
`Alice` will setup new node with name `val-4-workshop.4c621a00-2099-45c8-b50c-f06f95c0bcf3.com`


| Actor | env | dns name for Autonity node `fqdn` name| 
|-------|-----|-------------------------------------| 
| Alice | GKE | val-4-workshop.4c621a00-2099-45c8-b50c-f06f95c0bcf3.com. | 
| Governance Operator | GKE | operator0.autonity.online |
| Treasure Operator | GKE | operator0.autonity.online |

## Requirements
* The same as for [Initial ceremony workshop](./workshop_initial_ceremony.md)

## Step 2
* Actors: `Alice`
* Actions: Deploy to their own cloud enviroments `autonity` helm chart with `genesis.yaml` options that was provided
by `Network operator` in a [Initial ceremony workshop](./workshop_initial_ceremony.md) `Step 5`

## For environments based on GKE
* Deploy cluster (if need)
* Deploy workers (if need)
* Install
    ```shell script
    genesis="https://raw.githubusercontent.com/clearmatics/charts-ose/master/stable/autonity/genesis.yaml"
    name="val-4" # Name for Autonity node, for example: "val-4"
    helm install --name ${name} --namespace ${name} charts-ose.clearmatics.com/autonity -f ${genesis}
    ```

## Step 3
* Actors: `Alice`
* Actions: 
  * Get `enode` and `eth address for validator-0`:
  ```shell script
  helm status val-4
  ```
  * sent it to `Governance Operator`
 
## Step 5
* Actors: `Treasure Operator`
* Actions:
  * Forward Forward JSON-RPC API to localhost using notes from `helm status %chartname%`  
  * Configure metamask:
    * Create new metamask account using private key that was created at 
    [Initial ceremony workshop](./workshop_initial_ceremony.md)
    ```
    grep "private_key:" ./Treasure_Operator
    ```
    * Add to metamask new network:
      * RPC: http://127.0.0.1:8545
      * ChainID: `1489` (you can see it in genesis config)
   * Send money from `Treasure Operator` to `Governance Operator` address:
     * get address 
     ```
     grep "address:" ./Governance_Operator
     ```
     * Create and send transaction using metamask GUI
       * to: `Governance Operator` address
       * amount: `500` eth
       * Tx Gas Limit: `21000`
       * Gas Price: `10000` Gwei

## Step 6
* Actors: `Governance Operator`
* Actions:
  * Forward Forward JSON-RPC API to localhost using notes from `helm status %chartname%`  
  * Get `autonity contract` address
    ```shell script
    curl -X POST -H "Content-Type: application/json" --data \
    '{"jsonrpc":"2.0","method":"tendermint_getContractAddress","params":[],"id":1}' \
    http://localhost:8545
    ```
  * Clone repo:
    ```
    git clone git@github.com:clearmatics/governance-operator.git
    cd governance-operator
    ```
  * Edit `config.json` and replace `eth address` and `eth private_key` of Governance_Operator 
  * Send transaction to add new validator (each call AddValidator will about `3` ETH)
    ```
    contract_addr=???
    validator_addr=???
    stake=50000
    enode=`???`
    
    docker run -ti --rm -v $(pwd)/config.json:/governance-operator/config.json --net=host clearmatics/governance-operator \
          addValidator ${contract_addr} ${validator_addr} ${stake} ${enode}
    ```
  * Check Autonity contract WhiteList
    ```
    docker run -ti --rm -v $(pwd)/config.json:/governance-operator/config.json --net=host clearmatics/governance-operator getWhitelist ${contract_addr}
    ```
  * Check Autonity contract Validators list
    ```
    docker run -ti --rm -v $(pwd)/config.json:/governance-operator/config.json --net=host clearmatics/governance-operator getValidators ${contract_addr}
    ```     

## Step 7
* Actors: `Alice`
* Actions: Check that new node join network (use `helm status` notes and get last block number)
