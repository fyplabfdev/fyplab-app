import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PREDICTION, type PredictionChoice } from "@/lib/constants";

type PredictSheetProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;

  videoId: string;

  // optional defaults
  defaultChoice?: PredictionChoice;
  defaultStake?: number;

  // called when user confirms
  onConfirm: (payload: {
    videoId: string;
    choice: PredictionChoice;
    stake: number;
  }) => Promise<void> | void;
};

export function PredictSheet({
  open,
  onOpenChange,
  videoId,
  defaultChoice = "VIRAL",
  defaultStake = PREDICTION.STAKE_MIN,
  onConfirm,
}: PredictSheetProps) {
  const [choice, setChoice] = React.useState<PredictionChoice>(defaultChoice);
  const [stake, setStake] = React.useState<number>(clampStake(defaultStake));
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setChoice(defaultChoice);
      setStake(clampStake(defaultStake));
      setError(null);
      setSubmitting(false);
    }
  }, [open, defaultChoice, defaultStake]);

  const quickStakes = [10, 25, 50, 100, 200].filter(
    (n) => n >= PREDICTION.STAKE_MIN && n <= PREDICTION.STAKE_MAX
  );

  const canSubmit = !submitting && stake >= PREDICTION.STAKE_MIN && stake <= PREDICTION.STAKE_MAX;

  async function handleConfirm() {
    setError(null);

    const finalStake = clampStake(stake);
    if (finalStake < PREDICTION.STAKE_MIN || finalStake > PREDICTION.STAKE_MAX) {
      setError(`Stake must be between ${PREDICTION.STAKE_MIN} and ${PREDICTION.STAKE_MAX}.`);
      return;
    }

    try {
      setSubmitting(true);
      await onConfirm({ videoId, choice, stake: finalStake });
      onOpenChange(false);
    } catch (e: any) {
      setError(e?.message ?? "Prediction failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Make a Prediction</SheetTitle>
          <SheetDescription>
            Choose <b>VIRAL</b> or <b>NOT VIRAL</b>, then stake your points.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {/* Choice */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Your pick</p>
              <Badge variant="secondary">{choice}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={choice === "VIRAL" ? "default" : "outline"}
                onClick={() => setChoice("VIRAL")}
                className="h-11"
              >
                VIRAL
              </Button>
              <Button
                type="button"
                variant={choice === "NOT_VIRAL" ? "default" : "outline"}
                onClick={() => setChoice("NOT_VIRAL")}
                className="h-11"
              >
                NOT VIRAL
              </Button>
            </div>
          </div>

          <Separator />

          {/* Stake */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Stake</p>
              <p className="text-sm opacity-70">
                Min {PREDICTION.STAKE_MIN} • Max {PREDICTION.STAKE_MAX}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Input
                inputMode="numeric"
                type="number"
                min={PREDICTION.STAKE_MIN}
                max={PREDICTION.STAKE_MAX}
                value={stake}
                onChange={(e) => setStake(Number(e.target.value))}
                className="h-11"
              />
              <Button
                type="button"
                variant="outline"
                className="h-11"
                onClick={() => setStake((s) => clampStake(s + PREDICTION.STAKE_STEP))}
              >
                +{PREDICTION.STAKE_STEP}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {quickStakes.map((n) => (
                <Button
                  key={n}
                  type="button"
                  variant={stake === n ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStake(n)}
                >
                  {n}
                </Button>
              ))}
            </div>

            <div className="rounded-lg border border-border p-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="opacity-70">If you win</span>
                <span className="font-semibold">+{Math.floor(stake * 0.8)} profit</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="opacity-70">You receive</span>
                <span className="font-semibold">{Math.floor(stake * 1.8)} total</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="opacity-70">If you lose</span>
                <span className="font-semibold">-{stake}</span>
              </div>
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>
        </div>

        <SheetFooter className="mt-4">
          <div className="flex w-full gap-2">
            <Button type="button" variant="outline" className="w-1/3 h-11" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" className="w-2/3 h-11" disabled={!canSubmit} onClick={handleConfirm}>
              {submitting ? "Submitting..." : "Confirm Prediction"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function clampStake(n: number) {
  if (!Number.isFinite(n)) return PREDICTION.STAKE_MIN;
  return Math.max(PREDICTION.STAKE_MIN, Math.min(PREDICTION.STAKE_MAX, Math.floor(n)));
}
