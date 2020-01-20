# Template for validator*.magneto.network

Continuous Delivery repo for [validator*.magneto.network](https://devops.clearmatics.net/svc/001/00-index.html#kubernetes_level)

This CD will deploy and update one helm chart to certain certain kubernetes cluster and namespace.  

### Change Management process:

* `master` branch any time must reflect current state of environment. Manual changes without CD is prohibited.
* PR to `master` is a `Change Request`, should contain description of changes and implementation. PR must has review and be approved or rejected.
* `merge` to `master` branch does deploy (upgrade helm chart) and apply changes. 

### Change Control process:
* After each deploy (merge PR to `master` branch) CI will send notification to slack channel `#CC-%environment_name%`
* Remote kubernetes `etcd` keep history of last 50 helm chart releases. It contain full data about config, time and status. You can get it using command like this: (_example for magneto-template-chart_)
  ```
  helm history magneto-template-chart --max=3 --col-width 250
  ```
  `DESCRIPTION` will contain full link to the GitHub commit that was used to deploy
* TravisCI will keep all deployment history

## How to create a new environment using this template

* Create new git repo based on this template (including content).
* Change `env.global` at [./travis.yaml](./travis.yaml) and point to correct cluster, regeon, namespace, helm name, version, etc.
* Generate and encrypt `GCP service account key` based on this manual: [HowTo Encrypt secrets for TravisCI](https://devops.clearmatics.net/howto_encrypt_secrets_travis.html)
* Configure `slack` notification
  * Create a `Change Control Process` notification channel for your new environment (_example:_ `#cc-magneto-validator0`)
  * Add link to the current GitHub repo as a channel topic
  * Add a new [new Travis CI integration](https://clearmatics.slack.com/apps/new/A0F81FP4N-travis-ci) (_Examples for fields below:_)
    * Post to Channel: `#cc-magneto-validator0`
    * Descriptive Label: `validator0.magneto.network`
    * Customize Name: `validator0.magneto.network`
  * Encrypt your credentials and keep it in [./travis.yaml](./travis.yaml) 
  * Generate slack notification secret key and [Configure TravisCI for slack notifications](https://docs.travis-ci.com/user/notifications/#configuring-slack-notifications)
* Protect master branch.
* Protect `Write` access to the git repo. Be aware: Anybody with `write` access can escalate privilege using `PR` and receive access to remote environment.
