if [ ${ENABLE_PULL_UPDATE} ]; then
  sh /app/docker-paas-gitlab-deploy/update.sh
fi

node /app/docker-paas-gitlab-deploy/RunCypress.js