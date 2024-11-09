interface ResumeData {
  name: string;
  email: string;
  education: string;
  experience: string;
  skills: string[];
  profilePicture: string | null; // Store image URL as a string
}

const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeOutput = document.getElementById("resume-output") as HTMLElement;
const imagePreview = document.getElementById("image-preview") as HTMLElement;
const fileInput = document.getElementById("profile-picture") as HTMLInputElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  // Capture Form Data
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLInputElement).value;
  const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value
    .split(",")
    .map(skill => skill.trim());

  // Capture Profile Picture URL (if any)
  const profilePicture = imagePreview.querySelector("img") ? (imagePreview.querySelector("img") as HTMLImageElement).src : null;

  const resumeData: ResumeData = {
    name,
    email,
    education,
    experience,
    skills,
    profilePicture
  };

  // Generate Resume
  generateResume(resumeData);
});

// Handle Profile Picture Upload
fileInput.addEventListener("change", (e) => {
  const file = fileInput.files ? fileInput.files[0] : null;
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imagePreview.innerHTML = `<img src="${event.target?.result}" alt="Profile Picture" class="profile-image" />`;
    };
    reader.readAsDataURL(file);
  }
});

function generateResume(data: ResumeData) {
  resumeOutput.innerHTML = `
  <div id="resume-picture">
      ${data.profilePicture ? `<img src="${data.profilePicture}" alt="Profile Picture" class="profile-image" />` : '<p>No image uploaded</p>'}
    </div>  
  <h3>${data.name}</h3>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Education:</strong> ${data.education}</p>
    <p><strong>Experience:</strong> ${data.experience}</p>
    <p><strong>Skills:</strong> ${data.skills.map(skill => `<span>${skill}</span>`).join(", ")}</p>
    
  `;
}
