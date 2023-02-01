import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

class S3Utils {
    private AWSConnection : S3;

    constructor()
    {
        this.AWSConnection = new S3({region: process.env.AWS_REGION});
    }

    uploadFile = async (file) => {
        const newId = uuidv4();

        const fileKey = `images/${newId}.jpg`;

        const params = {
            Bucket: process.env.AWS_S3_BUCKET, 
            Key: fileKey, 
            Body: file
        };

        await this.AWSConnection.putObject(params).promise()
        .then((data) => { return data; });

        delete params.Body;

        const fullUrl = this.AWSConnection.getSignedUrl('getObject', params);
        const url = fullUrl.split('?')[0];

        return { 'id': newId,  'url': url };
    };

    getAll = async () => {
        const params = {Bucket: process.env.AWS_S3_BUCKET}; 

        const data  = await this.AWSConnection.listObjects(params).promise()
        .then((data) => { return data; } );

        return data.Contents.map(i => { return i.Key });
    }
};

export default S3Utils;