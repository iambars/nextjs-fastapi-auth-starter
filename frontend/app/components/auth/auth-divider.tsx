export default function AuthDivider() {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <span className="border-secondary/50 w-full border-t" />
      </div>

      <div className="relative flex justify-center">
        <span className="bg-background text-muted-foreground text-secondary px-2 text-sm">
          or
        </span>
      </div>
    </div>
  );
}
