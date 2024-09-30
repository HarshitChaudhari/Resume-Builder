document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;

    const experiences = Array.from(document.getElementsByClassName('experience')).map(exp => exp.value);

    document.getElementById('rName').innerText = name;
    document.getElementById('rEmail').innerText = email;
    document.getElementById('rPhone').innerText = phone;
    document.getElementById('rEducation').innerText = education;
    document.getElementById('rSkills').innerText = skills;

    const experienceList = document.getElementById('rExperience');
    experienceList.innerHTML = ''; 
    experiences.forEach(exp => {
        const listItem = document.createElement('li');
        listItem.innerText = exp;
        experienceList.appendChild(listItem);
    });

    document.getElementById('resumeOutput').classList.remove('hidden');
});

document.getElementById('addExperienceBtn').addEventListener('click', function() {
    const newExperience = document.createElement('textarea');
    newExperience.classList.add('experience');
    newExperience.placeholder = 'Job Title at Company (Year)';
    document.getElementById('experienceFields').appendChild(newExperience);
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const name = document.getElementById('rName').innerText;
    const email = document.getElementById('rEmail').innerText;
    const phone = document.getElementById('rPhone').innerText;
    const education = document.getElementById('rEducation').innerText;
    const skills = document.getElementById('rSkills').innerText;

    const experiences = Array.from(document.querySelectorAll('#rExperience li')).map(li => li.innerText);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(name, 20, 20);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Email: ${email}`, 20, 30);
    doc.text(`Phone: ${phone}`, 20, 40);

    doc.setFont('helvetica', 'bold');
    doc.text('Education:', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(education, 20, 70);

    doc.setFont('helvetica', 'bold');
    doc.text('Skills:', 20, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(skills, 20, 100);

    doc.setFont('helvetica', 'bold');
    doc.text('Experience:', 20, 120);
    experiences.forEach((exp, index) => {
        doc.setFont('helvetica', 'normal');
        doc.text(`${index + 1}. ${exp}`, 20, 130 + index * 10);
    });

    doc.save(`${name}-Resume.pdf`);
});
