import { useState } from "react";

import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { ReactComponent as ArrowBack } from "assets/icons/arrow-ios-back.svg";
import { ReactComponent as ArrowForward } from "assets/icons/arrow-ios-forward.svg";
import { getImageUrl } from "utils";
import { theme } from "utils/theme";

interface ProjectGalleryProps {
  gallery: any[];
}

const ProjectGallery = ({ gallery }: ProjectGalleryProps) => {
  const imagesToShow = gallery.slice(0, 4);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gallery.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1,
    );
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: isMobile ? "300px" : "450px",
          height: isMobile ? "300px" : "450px",
          display: "grid",
          gridTemplateColumns:
            gallery.length === 1
              ? "1fr"
              : gallery.length === 2
                ? "1fr 1fr"
                : "1fr 1fr",
          gridTemplateRows:
            gallery.length === 1
              ? "1fr"
              : gallery.length === 2
                ? "1fr"
                : gallery.length === 3
                  ? "1fr 1fr"
                  : "1fr 1fr 1fr",
          gap: "0px",
          overflow: "hidden",
        }}
      >
        {imagesToShow.map((image, idx) => {
          const url = getImageUrl(image, "medium") ?? image.url;

          let gridArea = "";
          if (gallery.length === 1) {
            gridArea = "1 / 1 / 2 / 2";
          } else if (gallery.length === 2) {
            gridArea = idx === 0 ? "1 / 1 / 2 / 2" : "1 / 2 / 2 / 3";
          } else if (gallery.length === 3) {
            if (idx === 0) gridArea = "1 / 1 / 3 / 2";
            if (idx === 1) gridArea = "1 / 2 / 2 / 3";
            if (idx === 2) gridArea = "2 / 2 / 3 / 3";
          } else if (gallery.length >= 4) {
            if (idx === 0) gridArea = "1 / 1 / 4 / 2";
            if (idx === 1) gridArea = "1 / 2 / 2 / 3";
            if (idx === 2) gridArea = "2 / 2 / 3 / 3";
            if (idx === 3) gridArea = "3 / 2 / 4 / 3";
          }

          return (
            <Box
              key={idx}
              sx={{
                gridArea,
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(idx)}
            >
              <img
                src={url}
                alt={image.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {idx === 3 && gallery.length > 4 && (
                <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  }}
                >
                  +{gallery.length - 4}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "relative",
            width: "100%", // Use the full viewport width
            height: "100%", // Use the full viewport height
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent", // Ensure a consistent background
            overflow: "hidden", // Prevent scrollbars
          }}
        >
          {gallery?.length > 1 && (
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: "16px",
                color: "white",
                zIndex: 10,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                "&>svg": {
                  height: isMobile ? "15px" : "25px",
                  width: isMobile ? "15px" : "25px",
                },
              }}
            >
              <ArrowBack />
            </IconButton>
          )}

          <img
            src={
              getImageUrl(gallery[currentIndex], "large") ??
              gallery[currentIndex].url
            }
            alt={gallery[currentIndex].name}
            style={{
              maxWidth: "100%",
              maxHeight: "calc(100vh - 64px)",
              objectFit: "contain",
            }}
          />

          {gallery?.length > 1 && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: "16px",
                color: "white",
                zIndex: 10,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                "&>svg": {
                  height: isMobile ? "15px" : "25px",
                  width: isMobile ? "15px" : "25px",
                },
              }}
            >
              <ArrowForward />
            </IconButton>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default ProjectGallery;
