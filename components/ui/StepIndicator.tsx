interface Props {
  current: number;
  total: number;

}

export default function StepIndicator({ current,total }: Props) {
   
    return(
        <div className="flex gap-2 justify-center mb-8">
            {Array.from({ length: total }).map((_, i) => (
                    <div
                        key={i}
                        className={i <= current
                        ? "w-8 h-2 rounded-full bg-yellow-400"
                        : "w-2 h-2 rounded-full bg-white/20"
                        }
                    />
                ))
            }
        </div>
    )
}