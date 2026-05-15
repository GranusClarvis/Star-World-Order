import CasinoContent from './CasinoContent';

export const metadata = {
  title: 'Cosmic Casino | Star World Order',
  description: 'Cosmic Casino — provably fair games on Monad. Star Forge Slots, Cosmic Flip, Gravity Dice, and Constellation Climb. The order plays, the stars decide.',
};

export default function CasinoPage() {
  return (
    <main className="min-h-screen">
      <CasinoContent />
    </main>
  );
}
