import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { XMasonry, XBlock } from "react-xmasonry";
import { selectImages, getImagesData } from "./gallerySlice";
import { DeleteIcon } from "../../images";
import "./Gallery.scss";

function Gallery({onClickDelete}) {
  /**
   * Data of all the images to display
   */
  const images = useSelector(selectImages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getImagesData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  /**
   * Get a component to display Image
   * @param {Object} imageData Image url and other required data
   */
  function getImageCard(imageData) {
    return (
      <Card className="item">
        <Card.Img src={imageData.url} alt={`${imageData.owner}'s Photo`} />
        <Card.ImgOverlay className="p-1 item-overlay d-flex flex-column-reverse">
          <Card.Text className="text-light mt-auto" as="h4">
            {imageData.owner}
          </Card.Text>
          <Button
            variant="none"
            className="m-0 p-0 align-self-end"
            value="delete"
            onClick={()=>onClickDelete(imageData.id)}
          >
            <DeleteIcon className="delete-icon" role="img" aria-label="Delete Icon" />
          </Button>
        </Card.ImgOverlay>
      </Card>
    );
  }

  return (
    <XMasonry targetBlockWidth={340}>
      {images && images.map((image, index) => {
        return <XBlock key={index}>{getImageCard(image)}</XBlock>;
      })}
    </XMasonry>
  );
}

export default Gallery;
