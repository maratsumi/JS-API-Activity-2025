function playAnimation() {
  const result_container = document.querySelector("#result");
  const pageAnimation = result_container.animate(
    [
      { transform: "translateY(200px)", opacity: 0.1 },
      { transform: "translateY(0px)", opacity: 1 },
    ],
    {
      duration: 4500,
    }
  );
}

export { playAnimation };
