interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 130 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      <path stroke="currentColor" fillRule="evenodd" clipRule="evenodd" d="M24.5833 10.1143H12.5149C9.59615 10.1143 7.76562 12.1812 7.76562 15.1071V23.0014C7.76562 25.9274 9.58605 27.9942 12.5149 27.9942H24.5819C27.5121 27.9942 29.334 25.9274 29.334 23.0014V15.1071C29.334 12.1812 27.5121 10.1143 24.5833 10.1143Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path stroke="currentColor" d="M12.4961 16.0645H24.5963" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path stroke="currentColor" d="M24.1134 10.1119L21.999 6.58774C20.4841 4.09277 17.8637 3.25101 15.3486 4.76731L5.01695 10.9853C2.51187 12.4901 2.00741 15.2042 3.51218 17.7194L7.59409 24.4735C7.78435 24.8007 7.9948 25.0947 8.2355 25.3585V25.3686" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="43" y="25" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fill="currentColor">
        <tspan>finance</tspan><tspan fontWeight="bold" fill="currentColor">X</tspan>
      </text>
    </svg>
  );
}
