function setDrop(){
const gettingStarted = document.getElementById('gettingStarted');
gettingStarted.innerHTML = 
        `<p><i class="ph ph-number-circle-one"></i>Choose your kit type (Personal, Family, or Pet Kit) from the dropdown in the Checklist section</p>
        <p><i class="ph ph-number-circle-two"></i>Review the pre-loaded emergency items for your selected kit</p> 
        <p><i class="ph ph-number-circle-three"></i>Check off items as you pack them - your progress is automatically saved</p>
        <p><i class="ph ph-number-circle-four"></i>Add custom items using the "Add Custom Item" section if needed</p>
        <p><i class="ph ph-number-circle-five"></i>Monitor your completion percentage to ensure you're fully prepared</p>`;
}


export const guide = () => {
    setDrop();
}