interface EditButtonProps {
    onEdit: () => void;
}

export const EditButton = ({ onEdit }: EditButtonProps) => {
    return (
        <button style={{ width: 50 }} onClick={onEdit}>
            Edit
        </button>
    );
};
