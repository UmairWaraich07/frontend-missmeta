import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { closeGuestUserPopup } from "@/store/guestUserPopup";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const LoginPopup = () => {
  const { isOpen } = useSelector((state: RootState) => state.guestUserModal);
  const dispatch = useDispatch();

  return (
    <>
      <AlertDialog
        open={isOpen}
        onOpenChange={() => dispatch(closeGuestUserPopup())}
      >
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent className="bg-gray">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LoginPopup;
