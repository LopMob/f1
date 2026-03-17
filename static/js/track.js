(function () {
    const BASE       = document.getElementById("trackBase");
    const PROGRESS   = document.getElementById("trackProgress");
    const CAR        = document.getElementById("carMarker");
    const CORNER_GRP = document.getElementById("cornerMarkers");

    if (!BASE || !PROGRESS) return;

    const TOTAL = BASE.getTotalLength();
    // ~15 секунд на круг при 60fps
    const SPEED = Math.max(0.4, TOTAL / (15 * 60));

    let raf = null;
    let pos = 0;

    // ── Setup dash animation ─────────────────────────────────────────────────
    PROGRESS.style.strokeDasharray  = TOTAL;
    PROGRESS.style.strokeDashoffset = TOTAL;

    // ── Place corner markers evenly along the path ───────────────────────────
    const cornerItems = document.querySelectorAll(".corner-item");
    const cornerCount = cornerItems.length;

    if (CORNER_GRP && cornerCount > 0) {
        // Distribute markers at even intervals along path
        for (let i = 0; i < cornerCount; i++) {
            const t       = TOTAL * (i / cornerCount) + TOTAL * 0.05;
            const pt      = BASE.getPointAtLength(t % TOTAL);
            const idx     = i + 1;
            const colors  = ["#e10600","#ff8c00","#ffe100","#00c853","#00b0ff","#d500f9","#ff4081","#76ff03"];
            const color   = colors[i % colors.length];

            // Outer glow circle
            const glow = document.createElementNS("http://www.w3.org/2000/svg","circle");
            glow.setAttribute("cx", pt.x);
            glow.setAttribute("cy", pt.y);
            glow.setAttribute("r",  "14");
            glow.setAttribute("fill", color);
            glow.setAttribute("opacity","0.18");
            glow.setAttribute("class","corner-glow");
            glow.dataset.idx = i;

            // Main circle
            const circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
            circle.setAttribute("cx", pt.x);
            circle.setAttribute("cy", pt.y);
            circle.setAttribute("r",  "9");
            circle.setAttribute("fill", color);
            circle.setAttribute("stroke","#0b0b0f");
            circle.setAttribute("stroke-width","2");
            circle.setAttribute("class","corner-dot");
            circle.dataset.idx = i;
            circle.style.cursor = "pointer";

            // Number label
            const text = document.createElementNS("http://www.w3.org/2000/svg","text");
            text.setAttribute("x", pt.x);
            text.setAttribute("y", pt.y + 4);
            text.setAttribute("text-anchor","middle");
            text.setAttribute("font-size","9");
            text.setAttribute("font-weight","700");
            text.setAttribute("fill","#fff");
            text.setAttribute("pointer-events","none");
            text.textContent = idx;

            CORNER_GRP.appendChild(glow);
            CORNER_GRP.appendChild(circle);
            CORNER_GRP.appendChild(text);

            // Click → highlight corner card on right
            circle.addEventListener("click", () => highlightCorner(i));
            glow.addEventListener("click",   () => highlightCorner(i));

            // Colour the corner card badge to match
            const item = cornerItems[i];
            if (item) {
                const badge = item.querySelector(".corner-turn");
                if (badge) badge.style.background = color;
                item.dataset.markerColor = color;
                item.addEventListener("mouseenter", () => pulseMarker(i));
                item.addEventListener("mouseleave", () => unpulseMarker(i));
                item.addEventListener("click",      () => highlightCorner(i));
            }
        }
    }

    function highlightCorner(idx) {
        // Reset all
        document.querySelectorAll(".corner-item").forEach(el => el.classList.remove("corner-active"));
        document.querySelectorAll(".corner-dot").forEach(el => {
            el.setAttribute("r", "9");
            el.setAttribute("opacity","1");
        });
        document.querySelectorAll(".corner-glow").forEach(el => {
            el.setAttribute("r","14");
            el.setAttribute("opacity","0.18");
        });

        // Activate selected
        const item = cornerItems[idx];
        if (item) {
            item.classList.add("corner-active");
            item.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        const dots  = CORNER_GRP.querySelectorAll(".corner-dot");
        const glows = CORNER_GRP.querySelectorAll(".corner-glow");
        if (dots[idx]) {
            dots[idx].setAttribute("r","12");
        }
        if (glows[idx]) {
            glows[idx].setAttribute("r","22");
            glows[idx].setAttribute("opacity","0.35");
        }
    }

    function pulseMarker(idx) {
        const dots = CORNER_GRP.querySelectorAll(".corner-dot");
        if (dots[idx]) dots[idx].setAttribute("r","12");
    }
    function unpulseMarker(idx) {
        const dots = CORNER_GRP.querySelectorAll(".corner-dot");
        if (dots[idx]) dots[idx].setAttribute("r","9");
    }

    // ── Car position update ──────────────────────────────────────────────────
    function moveCar(length) {
        if (!CAR) return;
        const pt   = BASE.getPointAtLength(length);
        const ptN  = BASE.getPointAtLength(Math.min(length + 2, TOTAL));
        const angle = Math.atan2(ptN.y - pt.y, ptN.x - pt.x) * 180 / Math.PI;
        CAR.setAttribute("transform", `translate(${pt.x},${pt.y}) rotate(${angle})`);
    }

    // ── Animation loop ───────────────────────────────────────────────────────
    function animate() {
        pos += SPEED;
        if (pos >= TOTAL) pos = TOTAL;

        PROGRESS.style.strokeDashoffset = TOTAL - pos;
        moveCar(pos);

        if (pos < TOTAL) {
            raf = requestAnimationFrame(animate);
        } else {
            PROGRESS.style.strokeDashoffset = 0;
            moveCar(TOTAL);
        }
    }

    function startAnimation() {
        if (raf) cancelAnimationFrame(raf);
        pos = 0;
        PROGRESS.style.strokeDashoffset = TOTAL;
        moveCar(0);
        raf = requestAnimationFrame(animate);
    }

    // ── Replay button ────────────────────────────────────────────────────────
    const btn = document.getElementById("replayBtn");
    if (btn) {
        btn.addEventListener("click", () => {
            startAnimation();
            btn.textContent = "Running…";
            btn.disabled = true;
            const lapTime = TOTAL / SPEED / 60;
            setTimeout(() => {
                btn.textContent = "↺ Replay Lap";
                btn.disabled = false;
            }, (TOTAL / SPEED) * (1000 / 60));
        });
    }

    // Start on load
    moveCar(0);
    startAnimation();
})();
