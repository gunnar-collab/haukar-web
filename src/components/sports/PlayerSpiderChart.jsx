import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function PlayerSpiderChart({ player }) {
  const isBasketball = player.stats?.sport === 'korfubolti' || player.sport === 'korfubolti';
  const isHandball = player.stats?.sport === 'handbolti' || player.sport === 'handbolti';
  const isGoalkeeper = player.position?.toLowerCase().includes('mark') || player.position?.toLowerCase().includes('markvörður');

  const chartData = useMemo(() => {
    if (!player.stats) return [];

    if (isBasketball) {
      // Basketball normalization (Max expected values for a top player)
      const MAX_PTS = 30;
      const MAX_REB = 15;
      const MAX_AST = 10;
      const MAX_EFF = 35;
      const MAX_MPG = 40;

      return [
        { subject: 'Stig', value: Math.min((player.stats.pts || 0) / MAX_PTS * 100, 100), raw: player.stats.pts || 0 },
        { subject: 'Fráköst', value: Math.min((player.stats.reb || 0) / MAX_REB * 100, 100), raw: player.stats.reb || 0 },
        { subject: 'Stoðsend.', value: Math.min((player.stats.ast || 0) / MAX_AST * 100, 100), raw: player.stats.ast || 0 },
        { subject: 'Framlag', value: Math.min((player.stats.eff || 0) / MAX_EFF * 100, 100), raw: player.stats.eff || 0 },
        { subject: 'Mínútur', value: Math.min((player.stats.mpg || 0) / MAX_MPG * 100, 100), raw: player.stats.mpg || 0 },
      ];
    }

    if (isHandball) {
      if (isGoalkeeper) {
        const MAX_SAVES = 200;
        const MAX_PCT = 50; // 50% is incredible
        const MAX_GAMES = 25;
        const savePct = parseFloat(player.stats.goalkeeper?.savePercentage || '0');
        
        return [
          { subject: 'Varin skot', value: Math.min(((player.stats.goalkeeper?.totalSaves || 0) / MAX_SAVES) * 100, 100), raw: player.stats.goalkeeper?.totalSaves || 0 },
          { subject: 'Markvarsla %', value: Math.min((savePct / MAX_PCT) * 100, 100), raw: `${savePct}%` },
          { subject: 'Leikir', value: Math.min(((player.stats.goalkeeper?.gamesPlayed || 0) / MAX_GAMES) * 100, 100), raw: player.stats.goalkeeper?.gamesPlayed || 0 },
          { subject: 'Stöðvanir', value: Math.min(((player.stats.defensive?.legalStops || 0) / 20) * 100, 100), raw: player.stats.defensive?.legalStops || 0 },
          { subject: 'Stolnir', value: Math.min(((player.stats.defensive?.steals || 0) / 20) * 100, 100), raw: player.stats.defensive?.steals || 0 },
        ];
      }

      // Outfield Handball Player
      const MAX_GOALS = 120;
      const MAX_SHOTS = 180;
      const MAX_STOPS = 30;
      const MAX_STEALS = 30;
      const MAX_SHOOTING_PCT = 80;

      const shootPct = parseFloat(player.stats.offensive?.shootingPercentage || '0');

      return [
        { subject: 'Mörk', value: Math.min(((player.stats.offensive?.totalGoals || 0) / MAX_GOALS) * 100, 100), raw: player.stats.offensive?.totalGoals || 0 },
        { subject: 'Skot', value: Math.min(((player.stats.offensive?.totalShots || 0) / MAX_SHOTS) * 100, 100), raw: player.stats.offensive?.totalShots || 0 },
        { subject: 'Nýting %', value: Math.min((shootPct / MAX_SHOOTING_PCT) * 100, 100), raw: `${shootPct}%` },
        { subject: 'Stöðvanir', value: Math.min(((player.stats.defensive?.legalStops || 0) / MAX_STOPS) * 100, 100), raw: player.stats.defensive?.legalStops || 0 },
        { subject: 'Stolnir', value: Math.min(((player.stats.defensive?.steals || 0) / MAX_STEALS) * 100, 100), raw: player.stats.defensive?.steals || 0 },
      ];
    }

    return [];
  }, [player, isBasketball, isHandball, isGoalkeeper]);

  if (chartData.length === 0) return null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1c2c6c] text-white text-xs p-3 rounded-xl shadow-lg border border-white/10">
          <p className="font-bold uppercase tracking-widest text-[#D4AF37] mb-1">{data.subject}</p>
          <p className="text-2xl font-black italic">{data.raw}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[250px] md:h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
          <Radar
            name="Tölfræði"
            dataKey="value"
            stroke="#c8102e"
            strokeWidth={3}
            fill="#c8102e"
            fillOpacity={0.6}
            isAnimationActive={true}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
