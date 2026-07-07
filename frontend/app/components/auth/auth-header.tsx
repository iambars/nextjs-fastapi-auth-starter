import Link from "next/link";

type AuthHeaderProps = {
  title: string;
  subtitle: string;
  linkHref: string;
  linkText: string;
};

export default function AuthHeader({
  title,
  subtitle,
  linkHref,
  linkText,
}: AuthHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-primary text-2xl font-bold">{title}</h1>

      <p className="text-secondary text-sm">
        {subtitle}{" "}
        <Link href={linkHref} className="text-green-600 hover:underline">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
