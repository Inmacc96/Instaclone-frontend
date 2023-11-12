import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Button, Dimmer, Icon, Loader, Modal } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS, PUBLISH } from "../../../gql/post";
import { GENERATE_UPLOAD_URL } from "../../../gql/user";
import { ResponseCloudinary } from "../../../types/responseCloudinary";
import { UploadedFile } from "../../../types/UploadedFile";
import "./ModalUpload.scss";
import { UploadType } from "../../../__generated__/graphql";

interface IModalUploadProps {
  show: boolean;
  setShow: (v: boolean) => void;
}
const folder = "posts";

const ModalUpload = ({ show, setShow }: IModalUploadProps) => {
  const { username } = useParams();
  const {
    data: uploadUrlData,
    loading: uploadUrlLoading,
    error: uploadUrlError,
  } = useQuery(GENERATE_UPLOAD_URL, {
    variables: { folder, uploadType: UploadType.Post },
  });
  const [publish] = useMutation(PUBLISH, {
    update(cache, { data }) {
      const newPost = data?.publish;
      const getPostsQuery = cache.readQuery({
        query: GET_POSTS,
        variables: { username: username ?? "" },
      });

      if (getPostsQuery?.getPosts && newPost) {
        cache.writeQuery({
          query: GET_POSTS,
          variables: { username: username ?? "" },
          data: {
            getPosts: [...getPostsQuery.getPosts, newPost],
          },
        });
      }
    },
  });
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFile: File[]) => {
    const file = acceptedFile[0];
    setUploadedFile({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpeg"], "image/png": [".png"] },
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onClose = () => {
    setIsLoading(false);
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.preview);
    }
    setUploadedFile(null);
    setShow(false);
  };

  if (uploadUrlLoading || uploadUrlError) return null;

  const { generateUploadUrl } = uploadUrlData!;

  const onPublish = async () => {
    if (uploadedFile) {
      const { signature, timestamp, public_id } = generateUploadUrl;
      const formData = new FormData();
      formData.append("file", uploadedFile.file);
      formData.append("folder", `instaclone/${folder}`);
      formData.append("allowed_formats", ["png", "jpeg"].toString());
      formData.append("public_id", public_id);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

      try {
        setIsLoading(true);
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result: ResponseCloudinary = await uploadResponse.json();
        const { url } = result;
        await publish({
          variables: { urlFile: url, typeFile: uploadedFile.type },
        });
      } catch (err) {
        toast.warning("Error publishing post");
        console.error("Error uploading post:", err);
      } finally {
        onClose();
      }
    }
  };

  return (
    <Modal open={show} onClose={onClose} className="modal-upload">
      <div
        {...getRootProps()}
        className="dropzone"
        style={uploadedFile ? { border: 0 } : {}}
      >
        {!uploadedFile && (
          <>
            <Icon name="cloud upload" />
            <p>Select or drag your photo to be published</p>
          </>
        )}
        <input {...getInputProps()} />
      </div>

      {uploadedFile?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url("${uploadedFile.preview}")` }}
        />
      )}

      {uploadedFile && (
        <Button className="btn-upload btn-action" onClick={onPublish}>
          Publish
        </Button>
      )}

      {isLoading && (
        <Dimmer active className="publishing">
          {/* Oscurece el contenedor padre */}
          <Loader />
          <p>Publishing...</p>
        </Dimmer>
      )}
    </Modal>
  );
};

export default ModalUpload;
