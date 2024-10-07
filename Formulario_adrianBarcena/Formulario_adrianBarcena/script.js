document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"]');
    const submitButton = document.querySelector('input[type="submit"]');
    const form = document.querySelector('form');

    // Vvalidaciones para cada campo
    const patterns = {
        nombre: /^[A-ZÁÉÍÓÚÑ\s]+$/,           
        apellido1: /^[A-ZÁÉÍÓÚÑ\s]+$/,         
        apellido2: /^[A-ZÁÉÍÓÚÑ\s]+$/,         
        direccion: /^[A-ZÁÉÍÓÚÑ0-9\s,.-]+$/,   
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,   
        telefono: /^[0-9]{9}$/,                
        edad: /^(?:1[01][0-9]|120|0?[1-9]|[1-9][0-9])$/,  
        dni: /^[0-9]{8}[a-zA-Z]$/             
    };

    // Función que validar los inputs
    function validateInput(input, pattern, errorMessage) {
        const value = input.value.trim();
        // Valida si está vacío
        if (!value) {
            input.style.backgroundColor = 'red';
            input.placeholder = `Campo ${input.id} requerido`;
            return false;
        }
        // Valida con el patrón
        if (!pattern.test(value)) {
            input.style.backgroundColor = 'red';
            input.placeholder = errorMessage;
            return false;
        } 
        // Valida rango de edad
        if (edad < 0 || edad > 120) {
            const ageValue = parseInt(value, 10);
            if (ageValue < 0 || ageValue > 120) {
                input.style.backgroundColor = 'red';
                input.placeholder = 'Edad debe estar entre 0 y 120';
                return false;
            }
        }
        input.style.backgroundColor = ''; // Restaurar el fondo si es válido
        return true;
    }

    // Función convertir en mayúsculas automáticamente
    function toUpperCaseInput(input) {
        input.addEventListener('input', function() {
            input.value = input.value.toUpperCase(); 
        });
    }
    //Campos específicos para convertir en mayúsculas automáticamente
    const uppercaseFields = ['Nombre', 'Apellido1', 'Apellido2', 'direccion'];
    uppercaseFields.forEach(field => {
        const inputElement = document.getElementById(field);
        if (inputElement) {
            toUpperCaseInput(inputElement);
        }
    });
    // Añadir evento 'blur' y control de longitud para el teléfono
    const telefonoInput = document.getElementById('telefono');
    // Restringe longitud del teléfono a 9 caracteres
    telefonoInput.addEventListener('input', function() {
        if (this.value.length > 9) {
            this.value = this.value.slice(0, 9); 
            this.style.backgroundColor = 'red'; 
        } 
    });

    // Añadir evento 'blur' para cada input
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            let inputId = this.id.toLowerCase();
            // Llamada función genérica de validación
            validateInput(this, patterns[inputId], `Formato de ${inputId} inválido`);
            // Verifica si todos los campos son válidos para activar el botón enviar
            let allValid = Array.from(inputs).every(input => {
                let id = input.id.toLowerCase();
                return input.value.trim() && patterns[id].test(input.value);
            });
            submitButton.disabled = !allValid;
            submitButton.disabled = !allValid;
        });
    });

    // Si no hay errores se restablece al enviarlo
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Formulario enviado con éxito!');
        // Restablecer el formulario
        form.reset();
        // Restablecer el fondo de los inputs
        inputs.forEach(input => {
            input.style.backgroundColor = ''; // Eliminar color de fondo
        });
        // Deshabilitar el botón de enviar nuevamente
        submitButton.disabled = true;
    });
});

// Función que muestra/oculta el textarea dependiendo de la opción que escojas
function f1(self) {
    if (self.value == "4") {
        document.getElementById("texto").style.display = 'block';
    } else {
        document.getElementById("texto").style.display = 'none';
    }
}







