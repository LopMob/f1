document.addEventListener("DOMContentLoaded", () => {
    const basePath = document.getElementById("trackBase");
    const progressPath = document.getElementById("trackProgress");
    const arrowMarker = document.getElementById("arrowMarker");

    if (!basePath || !progressPath || !arrowMarker) return;

    const totalLength = basePath.getTotalLength();
    let progress = 0;
    const speed = 2.2;

    progressPath.style.strokeDasharray = totalLength;
    progressPath.style.strokeDashoffset = totalLength;

    function setArrowPosition(lengthValue) {
        const point = basePath.getPointAtLength(lengthValue);

        const nextLength = Math.min(lengthValue + 1, totalLength);
        const nextPoint = basePath.getPointAtLength(nextLength);

        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

        arrowMarker.setAttribute(
            "transform",
            `translate(${point.x}, ${point.y}) rotate(${angle})`
        );
    }

    function animateTrack() {
        progress += speed;

        if (progress >= totalLength) {
            progress = totalLength;
        }

        progressPath.style.strokeDashoffset = totalLength - progress;
        setArrowPosition(progress);

        if (progress < totalLength) {
            requestAnimationFrame(animateTrack);
        } else {
            progressPath.style.strokeDashoffset = 0;
            setArrowPosition(totalLength);
        }
    }

    setArrowPosition(0);
    requestAnimationFrame(animateTrack);
});
