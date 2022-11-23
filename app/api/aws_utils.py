import os
import boto3
import botocore
import uuid
from botocore.exceptions import ClientError

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_URL = f"https://{BUCKET_NAME}.s3.amazonaws.com/"

client_s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("ACCESS_KEY_ID"),
   aws_secret_access_key=os.environ.get("SECRET_ACCESS_KEY")
)


def upload_file(file):
    print("uploading file")
    try:
        client_s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={'ACL': 'public-read'}
        )
    except ClientError as e:
        print("client error",e)
        return {"errors": str(e)}

    except Exception as e:
        print(" uploading exception",e)
        return {"errors": str(e)}

    return {"url": f"{S3_URL}{file.filename}"}


def generate_filename(filename):
    file_ext = filename.rsplit('.',1)[1].lower()
    uuid_name = uuid.uuid4().hex
    return f"{uuid_name}.{file_ext}"



def delete_file_from_s3(url):
    item_key = url.split("aws.com/")[1]
    try:
        delete = client_s3.delete_object(Bucket=BUCKET_NAME, Key=item_key)
    except Exception as e:
        return {"errors": str(e)}
