## Autonity helm chart

[![Join the chat at https://gitter.im/clearmatics/autonity](https://badges.gitter.im/clearmatics/autonity.svg)](https://gitter.im/clearmatics/autonity?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Introduction

This chart deploys a infrustructure for `validator` that is a member of  **private** [Autonity](https://www.autonity.io/) network onto a [Kubernetes](http://kubernetes.io) 
cluster using the [Helm](https://helm.sh) package manager.   
Autonity is a generalization of the Ethereum protocol based on a fork of go-ethereum.   
[Autonity Documentation](https://docs.autonity.io)

## Initial ceremony
### Phase 1
Actor: Operator
1. Operator sent for each organisation list with entrypoints

    | Organisation name | dns name |
    |-------------------|----------|
    | org1  | validator1.ogr1.com   |
    | org2  | val2.ogr2.net   |
    | org3  | validator3.ogr3.io    |
    | org4  | othername4.ogr4.co.uk |
    
    Requirements:
    1. Organisation should be owner of their domain
    1. DNSSEC for domain should be enabled
1. Operator also sent `genesis` options for the first block like:
    1. network_ID
    1. Chain_ID
    1. max gas price
    1. etc

### Phase 2
Actor: Each validator
1. Generate validator private and public keys
1. Allocate public IP and port for p2p connections
1. Push this data to own DNS records that was defined at `Phase 1`

    | type | name | value | TTL |
    |------|-------------------|-------------|---|
    | A    | validator1.@      | 203.0.113.1 | 24h |
    | TXT  | key_validator1.@  |ad840ab412c026b098291f5ab56f923214469c61d4a8be41334c9a00e2dc84a8ff9a5035b3683184ea79902436454a7a00e966de45ff46dbd118e426edd4b2d0| 1h |
    | TXT  | port_validator1.@ |30303        | 24h |

### Phase 3
Actor: Each validator
1. Check each dns records from list at `Phase 1` every `X` min
1. When all records was resolved, generate `genesis.json` and execute `autonity init`
1. Execute service `autonity`

### Phase 4
Actor: Each validator
1. Check if new blocks mined
1. Get from `autonity RPC` list of validators in a smart contract and check your own `enodeid`
    1. if it does not match - make alarm?
    1. if it matched - confirm that network was setup correctly
