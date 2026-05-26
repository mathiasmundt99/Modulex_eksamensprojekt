<script setup>
import { ref } from 'vue'

const contentTypes = [
    { value: 'pdf', label: 'PDF' },
    { value: 'youtube', label: 'YouTube Video (link)' }
]

const contentTitle = ref('')
const contentType = ref('pdf')
const description = ref('')
const file = ref(null)
const youtubeLink = ref('')

function handleFileChange(e) {
    file.value = e.target.files[0]
}
</script>

<template>
    <div class="upload-modal-box">
        <h2>Upload New Content</h2>
        <form @submit.prevent>
            <label for="content-title">Content Title</label>
            <input id="content-title" v-model="contentTitle" type="text" placeholder="Enter title" />

            <label for="content-type">Content Type</label>
            <select id="content-type" v-model="contentType">
                <option v-for="type in contentTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
            </select>

            <label for="description">Description</label>
            <textarea id="description" v-model="description" placeholder="Write a short description of this content" />

            <div v-if="contentType === 'pdf'" class="upload-area">
                <input type="file" id="file-upload" accept="application/pdf" @change="handleFileChange"
                    style="display:none" />
                <label for="file-upload" class="upload-label">
                    <span>{{ file?.name || 'Drag and drop or click to upload' }}</span>
                </label>
            </div>
            <div v-else class="upload-area">
                <input type="url" v-model="youtubeLink" placeholder="Paste YouTube video link here" />
            </div>

            <div class="actions">
                <button type="button" class="cancel">Cancel</button>
                <button type="submit" class="upload">Upload</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
/* Modal/Card style */
.upload-modal-box {
    background: var(--color-white, #fff);
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    border: 1.5px solid var(--color-border, #e0e0e0);
    padding: 28px 24px 20px 24px;
    max-width: none;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

h2 {
    font-size: 1.3rem;
    margin-bottom: 18px;
    font-weight: 600;
    text-align: left;
}

form {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

label {
    font-weight: 500;
    margin-bottom: 4px;
}

input[type="text"],
input[type="url"],
select,
textarea {
    width: 100%;
    border-radius: 6px;
    border: 1px solid #ccc;
    padding: 8px;
    font-size: 1rem;
    margin-bottom: 4px;
}

textarea {
    min-height: 60px;
    resize: vertical;
}

.upload-area {
    border: 1.5px dashed #e0e0e0;
    border-radius: 8px;
    padding: 18px;
    text-align: center;
    margin-bottom: 8px;
    background: #fafbfc;
}

.upload-label {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #ff6600;
    font-weight: 500;
}

.upload-icon {
    font-size: 2.2rem;
}

.actions {
    display: flex;
    gap: 12px;
    margin-top: 10px;
}

.actions .cancel {
    background: #fff;
    border: 1px solid #ccc;
    color: #333;
    border-radius: 6px;
    padding: 7px 18px;
    cursor: pointer;
}

.actions .upload {
    background: #ff6600;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 7px 18px;
    cursor: pointer;
    font-weight: 500;
}

@media (max-width: 600px) {
    .upload-modal-box {
        padding: 16px 4px 12px 4px;
        max-width: 98vw;
    }
}
</style>
