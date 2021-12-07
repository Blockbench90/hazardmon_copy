export const modalStyles = {
    content: {
        border: 'none',
        bottom: 'auto',
        left: 'auto',
        margin: 'auto',
        outline: 'none',
        overflow: 'unset',
        paddingBottom: 32,
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 32,
        position: 'relative',
        right: 'auto',
        top: 'auto',
        borderRadius: "15px"
    },
    overlay: {
        alignItems: 'center',
        background: 'rgba(10, 32, 33, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '50px 20px',
        zIndex: 10000
    }
};

export const parentSelector = () => document.getElementById('modalWrapper');
