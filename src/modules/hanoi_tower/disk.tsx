import React from "react";
import clsx from "clsx";

interface DiskProps {
  diskId: number;
  diskIndex: number;
  diskCount: number;
  isSelected: boolean;
  shouldOffsetDisk: boolean;
  isShowingIndices: boolean;
}

const Disk = ({
  diskId,
  diskIndex,
  diskCount,
  isSelected,
  shouldOffsetDisk,
  isShowingIndices,
}: DiskProps) => {
  const canStyleDisk = diskIndex === 0;

  const colors = [
    "bg-zinc-300",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-emerald-400",
    "bg-cyan-600",
    "bg-violet-500",
    "bg-pink-500",
    "bg-rose-300",
    "bg-slate-500",
    "bg-lime-50",
  ];

  const colorClass = colors[(diskId - 1) % colors.length];

  const getWidthDiff = (minWidth: number) =>
    (minWidth / diskCount) * (diskCount - diskId);

  return (
    <div
      data-disk-id={diskId}
      className={clsx(
        "my-[2px] flex  items-center z-50   justify-center rounded-3xl shadow-md transition-[margin-bottom]",
        colorClass,
        "sm:h-12",
        shouldOffsetDisk && canStyleDisk && "mb-6 sm:mb-8",
        isSelected && canStyleDisk && "animate-breathing shadow-lg",
        !isShowingIndices && "before:hidden"
      )}
      key={diskId}
      style={{
        width: `calc(100% - ${getWidthDiff(60)}px)`,
        height: "35px",
        border: "2px solid rgba(0, 0, 0, 0.2)",
      }}
    >
      {isShowingIndices && (
        <span className="text-black font-semibold">{diskId}</span>
      )}
    </div>
  );
};

export default Disk;
