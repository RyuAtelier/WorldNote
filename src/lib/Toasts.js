import { toast } from '@zerodevx/svelte-toast';

export const success = m => toast.push(m, {
    theme: {
        '--toastBackground': '#28a745', // Green background for success
        '--toastColor': '#ffffff', // White text color
        '--toastBarBackground': 'white' // Darker color for the progress bar
    },
    dismissable: false
});

export const warning = m => toast.push(m, {
    theme: {
        '--toastBackground': '#e68e1c', // Orange background for warning
        '--toastColor': '#ffffff', // White text color
        '--toastBarBackground': 'white' // Darker color for the progress bar
    },
    dismissable: false
});

export const error = m => toast.push(m, {
    theme: {
        '--toastBackground': '#dc3545', // Red background for error
        '--toastColor': '#ffffff', // White text color
        '--toastBarBackground': 'white' // Darker color for the progress bar
    },
    dismissable: false
});
