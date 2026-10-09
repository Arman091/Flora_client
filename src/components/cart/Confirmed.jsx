import * as React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../common/button";

export default function OrderConfirmed() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outline" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog open={open} onClose={handleClose} className="relative z-[1300]">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-md bg-white p-6">
            <DialogTitle className="text-base font-medium">
              {"Use Google's location service?"}
            </DialogTitle>
            <p className="mt-2 text-sm text-text-primary">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={handleClose}>
                Disagree
              </Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
