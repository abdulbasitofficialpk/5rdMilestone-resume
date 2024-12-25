var form = document.getElementById("Resumeform");
var resumeOutput = document.getElementById("resumeOutput");
var resumeLinkDiv = document.getElementById("resumeLink");
var shareableLink = document.getElementById("shareableLink");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("nameID").value;
    var email = document.getElementById("emailID").value;
    var phone = document.getElementById("phoneID").value;
    var education = document.getElementById("educationID").value;
    var experience = document.getElementById("experienceID").value;
    var skills = document.getElementById("skillsID").value;
    var profilePicture = document.getElementById("profilepictureID").files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var profilePicUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        var resumeContent = "\n            <img class=\"profilepicture\" src=\"".concat(profilePicUrl, "\" alt=\"Profile Picture\">\n            <h2 contenteditable=\"true\">").concat(name, "'s Resume</h2>\n            <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n            <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n            <h3>Education:</h3>\n            <p contenteditable=\"true\">").concat(education, "</p>\n            <h3>Experience:</h3>\n            <p contenteditable=\"true\">").concat(experience, "</p>\n            <h3>Skills:</h3>\n            <p contenteditable=\"true\">").concat(skills, "</p>\n            <div id=\"buttonContainer\" style=\"display: flex; gap: 10px; justify-content: center;\">\n                <button id=\"saveResumeButton\">Save Changes</button>\n                <button id=\"downloadResumeButton\">Download Resume</button>\n                <button id=\"getLinkButton\">Get Shareable Link</button>\n                <button id=\"DownloadPDF\">Download (PDF)</button>\n            </div>\n        ");
        resumeOutput.innerHTML = resumeContent;
        var resumeData = encodeURIComponent(resumeContent);
        var shareableUrl = "".concat(window.location.href, "?resume=").concat(resumeData);
        shareableLink.textContent = shareableUrl;
        resumeLinkDiv.style.display = 'block';
        var saveButton = document.getElementById("saveResumeButton");
        var downloadButton = document.getElementById("downloadResumeButton");
        var getLinkButton = document.getElementById("getLinkButton");
        saveButton.addEventListener("click", saveResume);
        downloadButton.addEventListener("click", downloadResume);
        getLinkButton.addEventListener("click", getShareableLink);
    };
    if (profilePicture) {
        reader.readAsDataURL(profilePicture);
    }
    form.reset();
});
function saveResume() {
    var updatedResume = resumeOutput.innerHTML;
    console.log("Updated Resume HTML:", updatedResume);
    alert("Your resume has been successfully updated. Review the changes and feel free to make further edits if needed.");
}
function downloadResume() {
    var resumeContent = resumeOutput.innerHTML;
    var blob = new Blob([resumeContent], { type: 'text/html' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';
    link.click();
}
function getShareableLink() {
    var resumeContent = resumeOutput.innerHTML;
    var encodedContent = encodeURIComponent(resumeContent);
    var shareableUrl = "".concat(window.location.href, "?resume=").concat(encodedContent);
    shareableLink.textContent = shareableUrl;
    resumeLinkDiv.style.display = 'block';
}
