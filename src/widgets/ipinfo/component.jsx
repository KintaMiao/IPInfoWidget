import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useWidgetAPI } from "utils/proxy/api-hooks";
import ErrorMessage from "components/error";
import Loading from "components/loading";

export default function IPInfo({ options }) {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  const api = useWidgetAPI(options);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ipResponse = await api.ip();
        const detailsResponse = await api.details(ipResponse.ip);
        setData({
          ip: ipResponse.ip,
          ...detailsResponse,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("widget.ipinfo.title")}
        </Typography>
        <Box>
          <Typography><strong>{t("widget.ipinfo.ip")}:</strong> {data.ip}</Typography>
          <Typography><strong>{t("widget.ipinfo.location")}:</strong> {data.city}, {data.country}</Typography>
          <Typography><strong>{t("widget.ipinfo.isp")}:</strong> {data.isp}</Typography>
          <Typography><strong>{t("widget.ipinfo.time")}:</strong> {new Date(data.timestamp).toLocaleString()}</Typography>
          <Typography><strong>{t("widget.ipinfo.userAgent")}:</strong> {data.userAgent}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
} 