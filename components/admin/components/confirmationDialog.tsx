import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConfirmationDialogProps {
  currentState: boolean;
  trigger: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ConfirmationDialog = ({
  currentState,
  trigger,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={handleConfirm}
                variant={"destructive"}
                className={
                  currentState
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-red-600"
                }
                type="submit"
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
