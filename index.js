"use strict";

const theName = document.getElementById("nameValue");
const theEnteredName = document.getElementById("displayValue");
const submitBtn = document.getElementById("submit");
const theModal = document.getElementById("themodal");

submitBtn.addEventListener("click", (e) =>
{
  e.preventDefault();
  const name = theName.value.trim();

  if (name === "")
  {
    alert("Enter your name please!");
    return;
  }

  theEnteredName.textContent = name;
  theModal.classList.remove("hidden");
});
