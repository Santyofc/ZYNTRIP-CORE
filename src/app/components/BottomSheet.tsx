import React from 'react';
import { Drawer } from 'vaul';

interface BottomSheetProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  snapPoints?: number[];
  defaultSnap?: number;
}

export function BottomSheet({ 
  children, 
  open = true, 
  onOpenChange,
  snapPoints,
  defaultSnap
}: BottomSheetProps) {
  return (
    <Drawer.Root 
      open={open} 
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      activeSnapPoint={defaultSnap}
      dismissible={false}
      modal={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] rounded-t-[28px] shadow-2xl outline-none max-w-[430px] mx-auto border-t-2 border-gray-900">
          <div className="w-10 h-1.5 bg-gray-700 rounded-full mx-auto mt-3 flex-shrink-0" />
          <div className="overflow-y-auto">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

interface SimpleBottomSheetProps {
  children: React.ReactNode;
}

export function SimpleBottomSheet({ children }: SimpleBottomSheetProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a] rounded-t-[28px] shadow-2xl border-t-2 border-gray-900">
      <div className="w-10 h-1.5 bg-gray-700 rounded-full mx-auto mt-3 mb-1" />
      {children}
    </div>
  );
}
