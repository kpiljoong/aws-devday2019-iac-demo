import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');

export class Loader extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, url: string, tps: number) {
    super(scope, id); 

    const cluster = new ecs.Cluster(this, 'Cluster');

    const taskDef = new ecs.FargateTaskDefinition(this, "LoaderTask");
    taskDef.addContainer("Loader", {
      image: ecs.ContainerImage.fromAsset('./loader'),
      environment: {
        'URL': url
      }
    });

    const fargate = new ecs.FargateService(this, "Fargate", {
      cluster: cluster,
      taskDefinition: taskDef,
      desiredCount: tps
    });
  }
}