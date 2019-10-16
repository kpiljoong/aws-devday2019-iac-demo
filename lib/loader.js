"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const ecs = require("@aws-cdk/aws-ecs");
class Loader extends cdk.Construct {
    constructor(scope, id, url, tps) {
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
exports.Loader = Loader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXNDO0FBRXRDLHdDQUF5QztBQUV6QyxNQUFhLE1BQU8sU0FBUSxHQUFHLENBQUMsU0FBUztJQUN2QyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEdBQVcsRUFBRSxHQUFXO1FBQ3BFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVqRCxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDbEUsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7WUFDN0IsS0FBSyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztZQUMvQyxXQUFXLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLEdBQUc7YUFDWDtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxPQUFPO1lBQ2hCLGNBQWMsRUFBRSxPQUFPO1lBQ3ZCLFlBQVksRUFBRSxHQUFHO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXBCRCx3QkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY29yZScpO1xuaW1wb3J0IGVjMiA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1lYzInKTtcbmltcG9ydCBlY3MgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtZWNzJyk7XG5cbmV4cG9ydCBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHVybDogc3RyaW5nLCB0cHM6IG51bWJlcikge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7IFxuXG4gICAgY29uc3QgY2x1c3RlciA9IG5ldyBlY3MuQ2x1c3Rlcih0aGlzLCAnQ2x1c3RlcicpO1xuXG4gICAgY29uc3QgdGFza0RlZiA9IG5ldyBlY3MuRmFyZ2F0ZVRhc2tEZWZpbml0aW9uKHRoaXMsIFwiTG9hZGVyVGFza1wiKTtcbiAgICB0YXNrRGVmLmFkZENvbnRhaW5lcihcIkxvYWRlclwiLCB7XG4gICAgICBpbWFnZTogZWNzLkNvbnRhaW5lckltYWdlLmZyb21Bc3NldCgnLi9sb2FkZXInKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICdVUkwnOiB1cmxcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGZhcmdhdGUgPSBuZXcgZWNzLkZhcmdhdGVTZXJ2aWNlKHRoaXMsIFwiRmFyZ2F0ZVwiLCB7XG4gICAgICBjbHVzdGVyOiBjbHVzdGVyLFxuICAgICAgdGFza0RlZmluaXRpb246IHRhc2tEZWYsXG4gICAgICBkZXNpcmVkQ291bnQ6IHRwc1xuICAgIH0pO1xuICB9XG59Il19