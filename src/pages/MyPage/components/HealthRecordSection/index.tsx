import type { GetMyDataRecordHealthDuration } from 'api/generated/schemas';
import { useHealthRecords } from 'hooks/useHealthRecords';
import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { theme } from 'styles/theme';
import DurationFilterButtons from './components/DurationFilterButtons';
import {
  ChartWrapper,
  ErrorContainer,
  LoadingContainer,
  RetryButton,
  SectionContainer,
} from './index.styles';

const HealthRecordSection = () => {
  const [selectedDuration, setSelectedDuration] =
    useState<GetMyDataRecordHealthDuration>('year');

  const { data, isLoading, isError, refetch } = useHealthRecords({
    duration: selectedDuration,
  });

  const formatXAxisLabel = (dateString: string) => {
    const date = new Date(dateString);

    switch (selectedDuration) {
      case 'year': {
        return `${date.getMonth() + 1}月`;
      }
      case 'month': {
        return date.getDate().toString();
      }
      case 'week': {
        return date.toLocaleDateString('ja-JP', { weekday: 'short' });
      }
      case 'day': {
        return `${date.getHours()}時`;
      }
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <SectionContainer>
        <LoadingContainer>データを読み込んでいます...</LoadingContainer>
        <DurationFilterButtons
          selectedDuration={selectedDuration}
          onDurationChange={setSelectedDuration}
          disabled
        />
      </SectionContainer>
    );
  }

  if (isError || !data?.data) {
    return (
      <SectionContainer>
        <ErrorContainer>
          <div>データの取得に失敗しました</div>
          <RetryButton onClick={() => refetch()}>再試行</RetryButton>
        </ErrorContainer>
        <DurationFilterButtons
          selectedDuration={selectedDuration}
          onDurationChange={setSelectedDuration}
        />
      </SectionContainer>
    );
  }

  const chartData = data.data.items.map((item) => ({
    date: item.date,
    weight: item.weight,
    fatRate: item.fatRate,
  }));

  return (
    <SectionContainer>
      <ChartWrapper>
        {chartData.length === 0 ? (
          <LoadingContainer>記録がありません</LoadingContainer>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid
                stroke={theme.colors.white}
                strokeWidth={1}
                vertical
                horizontal={false}
                syncWithTicks
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxisLabel}
                tick={{
                  fill: theme.colors.white,
                  fontSize: '0.8rem',
                  fontWeight: 300,
                  fontFamily: theme.fonts.japanese,
                }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '0.4rem',
                  color: theme.colors.white,
                }}
                labelFormatter={(label) => formatXAxisLabel(label as string)}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke={theme.colors.primary[300]}
                strokeWidth={3}
                dot={{ r: 4, fill: theme.colors.primary[300] }}
                name="体重 (kg)"
              />
              <Line
                type="monotone"
                dataKey="fatRate"
                stroke={theme.colors.secondary[300]}
                strokeWidth={3}
                dot={{ r: 4, fill: theme.colors.secondary[300] }}
                name="体脂肪率 (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartWrapper>
      <DurationFilterButtons
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
      />
    </SectionContainer>
  );
};

export default HealthRecordSection;
