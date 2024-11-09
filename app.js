var form = document.getElementById("resume-form");
var resumeOutput = document.getElementById("resume-output");
var imagePreview = document.getElementById("image-preview");
var fileInput = document.getElementById("profile-picture");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Capture Form Data
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value
        .split(",")
        .map(function (skill) { return skill.trim(); });
    // Capture Profile Picture URL (if any)
    var profilePicture = imagePreview.querySelector("img") ? imagePreview.querySelector("img").src : null;
    var resumeData = {
        name: name,
        email: email,
        education: education,
        experience: experience,
        skills: skills,
        profilePicture: profilePicture
    };
    // Generate Resume
    generateResume(resumeData);
});
// Handle Profile Picture Upload
fileInput.addEventListener("change", function (e) {
    var file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            imagePreview.innerHTML = "<img src=\"".concat((_a = event.target) === null || _a === void 0 ? void 0 : _a.result, "\" alt=\"Profile Picture\" class=\"profile-image\" />");
        };
        reader.readAsDataURL(file);
    }
});
function generateResume(data) {
    resumeOutput.innerHTML = "\n  <div id=\"resume-picture\">\n      ".concat(data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" alt=\"Profile Picture\" class=\"profile-image\" />") : '<p>No image uploaded</p>', "\n    </div>  \n  <h3>").concat(data.name, "</h3>\n    <p><strong>Email:</strong> ").concat(data.email, "</p>\n    <p><strong>Education:</strong> ").concat(data.education, "</p>\n    <p><strong>Experience:</strong> ").concat(data.experience, "</p>\n    <p><strong>Skills:</strong> ").concat(data.skills.map(function (skill) { return "<span>".concat(skill, "</span>"); }).join(", "), "</p>\n    \n  ");
}
