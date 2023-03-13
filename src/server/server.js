import aws from "aws-sdk";

const server = (secretKeyId, accessKeyId, bucketName, region) => {

    const setAwsConfig = () => {
        try {
            aws.config.setPromisesDependency(null);
            aws.config.update({
                accessKeyId,
                secretAccessKey: secretKeyId,
                region,
            });
            const S3 = new aws.S3();
            return S3;
        } catch (e) {
            console.log("Error is: ", e)
        }
    }

    const listObjects = async () => {
        try {
            const S3 = setAwsConfig();
            const listParams = {  
                Bucket: bucketName,
            }
            const listResponse = await S3.listObjectsV2(listParams).promise();
            let contents = listResponse.Contents;
            console.log("Success List:", contents);
            return contents;
        } catch (e) {
            console.log("Error is: ", e)
        }
    }

    const createObject = async (name) => {
        try {
            const S3 = setAwsConfig();
            const uploadParams = {
                Bucket: bucketName,
                Key: name,
                Body: "This is " + name,
            }
            const uploadResponse = await S3.putObject(uploadParams).promise();
            console.log("Created: ", uploadResponse);
        } catch (e) {
            console.log("Error is: ", e)
        }
    }

    const deleteObject = async (key) => {
        try {
            const S3 = setAwsConfig();
            const deleteParams = {
                Bucket: bucketName,
                Key: key,
            };
            const deleteResponse = await S3.deleteObject(deleteParams).promise();
            console.log("Deleted: ", deleteResponse);
         } catch (e) {
            console.log("Error is: ", e)
        }
    }

    return { listObjects, createObject, deleteObject };

};

export default server;

