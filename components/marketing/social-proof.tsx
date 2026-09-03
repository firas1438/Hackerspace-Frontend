const SocialProof = () => {
  return (
    <div className="flex items-center gap-4 pt-2">
      <div className="flex -space-x-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-10 w-10 rounded-full border-2 border-white/60 bg-muted ring-offset-2"
            style={{
              backgroundImage: `url('https://i.pravatar.cc/100?img=${i + 10}')`,
              backgroundSize: "cover",
            }}
          />
        ))}
      </div>
      <p className="text-sm font-medium text-white/75">
        Join <span className="text-white/75 font-bold">1,000+</span> users
        worldwide
      </p>
    </div>
  );
};

export default SocialProof;
