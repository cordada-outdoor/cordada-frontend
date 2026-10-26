import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Dialog, IconButton, Typography } from "@mui/material";

import { ReactComponent as ArrowBack } from "assets/icons/arrow-ios-back.svg";
import { ReactComponent as ArrowForward } from "assets/icons/arrow-ios-forward.svg";
import { getImageUrl } from "utils";

interface ProjectGalleryProps {
  gallery: any[];
}

const ProjectGallery = ({ gallery }: ProjectGalleryProps) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;
  const hasSeveral = gallery.length > 1;

  const showNext = () =>
    setOpenIndex((i) => (i === null ? i : (i + 1) % gallery.length));
  const showPrev = () =>
    setOpenIndex((i) =>
      i === null ? i : (i - 1 + gallery.length) % gallery.length,
    );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // showNext/showPrev only use the state setter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const current = isOpen ? gallery[openIndex] : null;

  return (
    <>
      <Box className="project-gallery">
        {gallery.map((image, idx) => (
          <button
            key={image.id ?? idx}
            type="button"
            className="project-gallery-item"
            onClick={() => setOpenIndex(idx)}
            aria-label={`${t("gallery.open")} ${idx + 1} / ${gallery.length}`}
          >
            <img
              src={getImageUrl(image, "medium") ?? undefined}
              alt={image.alternativeText ?? ""}
              loading="lazy"
            />
          </button>
        ))}
      </Box>

      <Dialog
        open={isOpen}
        onClose={() => setOpenIndex(null)}
        maxWidth={false}
        className="gallery-lightbox"
        aria-label={t("gallery.label")}
      >
        {current && (
          <>
            <img
              className="gallery-lightbox-image"
              src={getImageUrl(current, "large") ?? undefined}
              alt={current.alternativeText ?? ""}
            />
            <IconButton
              className="gallery-lightbox-close"
              aria-label={t("close")}
              onClick={() => setOpenIndex(null)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </IconButton>
            {hasSeveral && (
              <>
                <IconButton
                  className="gallery-lightbox-nav prev"
                  aria-label={t("gallery.previous")}
                  onClick={showPrev}
                >
                  <ArrowBack aria-hidden="true" />
                </IconButton>
                <IconButton
                  className="gallery-lightbox-nav next"
                  aria-label={t("gallery.next")}
                  onClick={showNext}
                >
                  <ArrowForward aria-hidden="true" />
                </IconButton>
                <Typography className="gallery-lightbox-counter">
                  {(openIndex ?? 0) + 1} / {gallery.length}
                </Typography>
              </>
            )}
          </>
        )}
      </Dialog>
    </>
  );
};

export default ProjectGallery;
