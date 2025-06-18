document.addEventListener('DOMContentLoaded', function() {
    const colors = loadColors();
    renderColors(colors);
    
    document.getElementById('colorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('colorName').value.trim();
        const type = document.getElementById('colorType').value;
        const code = document.getElementById('colorCode').value.trim();

        document.getElementById('nameError').textContent = '';
        document.getElementById('codeError').textContent = ''
        let isValid = true;
                
        if (!name) {
            document.getElementById('nameError').textContent = 'Color name is required';
            isValid = false;
        } else if (!/^[A-Za-z]+$/.test(name)) {
            document.getElementById('nameError').textContent = 'Color can only contain letters';
            isValid = false;
        } else if (colors.some(c => c.name.toLowerCase() === name.toLowerCase())) {
            document.getElementById('nameError').textContent = 'Color name must be unique';
            isValid = false;
        }
        let codeError = '';
                
        if (type === 'RGB') {
            if (!/^\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*$/.test(code)) {
                codeError = 'RGB code must match the pattern [0-255], [0-255], [0-255]';
            } else {
                const parts = code.split(',').map(part => parseInt(part.trim()));
                if (parts.some(num => isNaN(num) || num < 0 || num > 255)) {
                    codeError = 'Each RGB value must be between 0 and 255';
                }
            }
        } else if (type === 'RGBA') {
            if (!/^\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*[01]?(\.\d+)?\s*$/.test(code)) {
                codeError = 'RGBA code must match the pattern [0-255], [0-255], [0-255], [0-1]';
            } else {
                const parts = code.split(',').map(part => part.trim());
                const rgbParts = parts.slice(0, 3).map(part => parseInt(part));
                const alpha = parseFloat(parts[3]);
                        
                if (rgbParts.some(num => isNaN(num) || rgbParts.some(num => num < 0 || num > 255))) {
                    codeError = 'First 3 RGBA values must be between 0 and 255';
                } else if (isNaN(alpha) || alpha < 0 || alpha > 1) {
                    codeError = 'Alpha value must be between 0 and 1';
                }
            }
        } else if (type === 'HEX') {
            if (!/^#([0-9A-Fa-f]{6})$/.test(code)) {
                codeError = 'HEX code must start with # followed by 6 digits or letters A-F';
            }
        }    
        if (codeError) {
            document.getElementById('codeError').textContent = codeError;
            isValid = false;
        }      
        if (isValid) {
            const newColor = {
                name: name.toUpperCase(),
                type: type,
                code: code
            };    
            colors.push(newColor);
            saveColors(colors);
            renderColors(colors);
            document.getElementById('colorForm').reset();
        }
    });
});
function loadColors() {
    const cookies = document.cookie.split(';');
    const colorCookie = cookies.find(c => c.trim().startsWith('colors='));
     
    if (colorCookie) {
        try {
            const colorJson = decodeURIComponent(colorCookie.split('=')[1]);
            return JSON.parse(colorJson);
        } catch (e) {
            console.error('Error parsing colors cookie', e);
        }
    }
    return [
        { name: 'YELLOWGREEN', type: 'RGB', code: '154, 205, 50' },
        { name: 'DARKCYAN', type: 'RGBA', code: '0, 139, 139, 1' },
        { name: 'ORANGERED', type: 'HEX', code: '#FF4500' }
    ];
}     
function saveColors(colors) {
    const json = JSON.stringify(colors);
    const date = new Date();
    date.setTime(date.getTime() + 3 * 60 * 60 * 1000); // 3 hours expiration 
    document.cookie = `colors=${encodeURIComponent(json)}; expires=${date.toUTCString()}; path=/`;
}
function renderColors(colors) {
    const container = document.getElementById('colorsContainer');
    container.innerHTML = '';
    colors.forEach(color => {
        const colorItem = document.createElement('div');
        colorItem.className = 'color-item';
        let colorValue;
        if (color.type === 'RGB') {
            const [r, g, b] = color.code.split(',').map(part => parseInt(part.trim()));
            colorValue = `rgb(${r}, ${g}, ${b})`;
        } else if (color.type === 'RGBA') {
            const parts = color.code.split(',').map(part => part.trim());
            colorValue = `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${parts[3]})`;
        } else if (color.type === 'HEX') {
            colorValue = color.code;
        }     
        colorItem.innerHTML = `
            <div class="color-preview" style="background-color: ${colorValue}"></div>
            <div class="color-info">
                <strong>${color.name}</strong> ${color.type}<br>
                ${color.code}
            </div>`;    
        container.appendChild(colorItem);
    });
}