const form = document.getElementById("Resumeform") as HTMLFormElement;
const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
const resumeLinkDiv = document.getElementById("resumeLink") as HTMLDivElement;
const shareableLink = document.getElementById("shareableLink") as HTMLParagraphElement;

form.addEventListener("submit", function (event: Event) {
    event.preventDefault();

    const name = (document.getElementById("nameID") as HTMLInputElement).value;
    const email = (document.getElementById("emailID") as HTMLInputElement).value;
    const phone = (document.getElementById("phoneID") as HTMLInputElement).value;
    const education = (document.getElementById("educationID") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experienceID") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skillsID") as HTMLTextAreaElement).value;
    const profilePicture = (document.getElementById("profilepictureID") as HTMLInputElement).files![0];

    const reader = new FileReader();
    reader.onload = function(e) {
        const profilePicUrl = e.target?.result as string;

        const resumeContent = `
            <img class="profilepicture" src="${profilePicUrl}" alt="Profile Picture">
            <h2 contenteditable="true">${name}'s Resume</h2>
            <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
            <p><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>
            <h3>Education:</h3>
            <p contenteditable="true">${education}</p>
            <h3>Experience:</h3>
            <p contenteditable="true">${experience}</p>
            <h3>Skills:</h3>
            <p contenteditable="true">${skills}</p>
            <div id="buttonContainer" style="display: flex; gap: 10px; justify-content: center;">
                <button id="saveResumeButton">Save Changes</button>
                <button id="downloadResumeButton">Download Resume</button>
                <button id="getLinkButton">Get Shareable Link</button>
                <button id="DownloadPDF">Download (PDF)</button>
            </div>
        `;
        resumeOutput.innerHTML = resumeContent;

        const resumeData = encodeURIComponent(resumeContent);
        const shareableUrl = `${window.location.href}?resume=${resumeData}`;
        shareableLink.textContent = shareableUrl;
        resumeLinkDiv.style.display = 'block';

        const saveButton = document.getElementById("saveResumeButton") as HTMLButtonElement;
        const downloadButton = document.getElementById("downloadResumeButton") as HTMLButtonElement;
        const getLinkButton = document.getElementById("getLinkButton") as HTMLButtonElement;

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
    const updatedResume = resumeOutput.innerHTML;
    console.log("Updated Resume HTML:", updatedResume);

    alert("Your resume has been successfully updated. Review the changes and feel free to make further edits if needed.");
}

function downloadResume() {
    const resumeContent = resumeOutput.innerHTML;

    const blob = new Blob([resumeContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';
    link.click();
}

function getShareableLink() {
    const resumeContent = resumeOutput.innerHTML;
    const encodedContent = encodeURIComponent(resumeContent);
    const shareableUrl = `${window.location.href}?resume=${encodedContent}`;
    shareableLink.textContent = shareableUrl;
    resumeLinkDiv.style.display = 'block'; 
}