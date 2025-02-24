import gsap from 'gsap';



export default function showLoading(isLoading) {
    const loadingElement = document.getElementById('loading');

    if (isLoading) {
        gsap.to(loadingElement, {
            opacity: 1,
            scale: 1,
            display: "block",
            duration: 0.3
        });
    } else {
        gsap.to(loadingElement, {
            opacity: 0,
            scale: 0.8,
            display: "none",
            duration: 0.3
        });
    }
}
