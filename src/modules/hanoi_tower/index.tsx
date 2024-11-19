import React, { useState } from "react";
import Disk from "./disk";

const solveHanoiTower = (
  n: number,
  from: string,
  to: string,
  via: string,
  moves: [number, string, string][] = []
): [number, string, string][] => {
  if (n === 1) {
    moves.push([1, from, to]);
  } else {
    solveHanoiTower(n - 1, from, via, to, moves);
    moves.push([n, from, to]);
    solveHanoiTower(n - 1, via, to, from, moves);
  }
  return moves;
};

const HanoiTower = () => {
  const [numberOfDisks, setNumberOfDisks] = useState<number>(3);
  const [moves, setMoves] = useState<[number, string, string][]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);
  const [towers, setTowers] = useState<{ [key: string]: number[] }>({
    A: [],
    B: [],
    C: [],
  });
  const [totalMoves, setTotalMoves] = React.useState<number | null>(null);

  const initializeTowers = () => {
    const initialTowers = {
      A: Array.from({ length: numberOfDisks }, (_, i) => numberOfDisks - i),
      B: [],
      C: [],
    };
    setTowers(initialTowers);
    setCurrentMoveIndex(0);
  };

  const handleSolve = () => {
    if (numberOfDisks < 1 || numberOfDisks > 10) {
      alert("Số lượng đĩa phải từ 1 đến 10.");
      return;
    }

    const movesCount = Math.pow(2, numberOfDisks) - 1;
    setTotalMoves(movesCount);

    setMoves(solveHanoiTower(numberOfDisks, "A", "C", "B"));
    initializeTowers();
  };

  const handleNextMove = () => {
    if (currentMoveIndex < moves.length) {
      const [disk, from, to] = moves[currentMoveIndex];
      const newTowers = { ...towers };
      const diskToMove = newTowers[from].pop();
      if (diskToMove !== undefined) {
        newTowers[to].push(diskToMove);
        setTowers(newTowers);
        setCurrentMoveIndex(currentMoveIndex + 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-full  mx-auto">
      <h2 className="text-2xl font-semibold ">Tháp Hà Nội</h2>

      <div className="flex items-center font-semibold ">
        <label className="mr-2 text-lg">Số lượng đĩa (tối đa 10):</label>
        <input
          type="number"
          value={numberOfDisks}
          onChange={(e) => setNumberOfDisks(Number(e.target.value))}
          min="1"
          max="10"
          className="border rounded px-2 py-1 w-16 text-center"
        />
      </div>

      {/* <button
        onClick={handleSolve}
        className=" bg-Neutral-5 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded transition duration-300 "
      >
        Bắt đầu giải
      </button> */}
      <button
        onClick={handleSolve}
        type="button"
        className="py-2.5 px-5  mt-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {" "}
        Bắt đầu giải
      </button>
      {totalMoves !== null && (
        <button
          type="button"
          className="py-2.5 px-5  mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {" "}
          Số lượng bước cần thiết: {totalMoves}
        </button>
      )}

      <button
        onClick={handleNextMove}
        disabled={currentMoveIndex >= moves.length}
        type="button"
        className="py-2.5 px-5  mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {" "}
        Bước tiếp theo
      </button>

      <div className="flex gap-12 justify-between w-full">
        {["A", "B", "C"].map((tower) => (
          <div key={tower} className="flex flex-col items-center h-full">
            <div className="text-lg font-semibold mb-2">{tower}</div>
            <div className="w-[100px] h-[420px] bg-gray-200 rounded-lg flex  flex-col-reverse items-center relative">
              <div className="absolute bottom-0 z-999 w-1 h-full bg-gray-500"></div>

              {towers[tower].map((disk, index) => {
                return (
                  <Disk
                    key={disk}
                    diskId={disk}
                    diskIndex={index}
                    diskCount={numberOfDisks}
                    isSelected={
                      currentMoveIndex < moves.length &&
                      moves[currentMoveIndex][0] === disk
                    }
                    shouldOffsetDisk={
                      currentMoveIndex > 0 &&
                      moves[currentMoveIndex - 1][0] === disk
                    }
                    isShowingIndices
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-Neutral-2 font-semibold">
        {currentMoveIndex < moves.length
          ? `Bước ${currentMoveIndex + 1}: Di chuyển đĩa ${
              moves[currentMoveIndex][0]
            } từ cọc ${moves[currentMoveIndex][1]} sang cọc ${
              moves[currentMoveIndex][2]
            }`
          : "Hoàn thành!"}
      </div>
    </div>
  );
};

export default HanoiTower;
