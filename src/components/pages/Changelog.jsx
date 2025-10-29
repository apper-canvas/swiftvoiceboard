import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ChangelogCard from "@/components/molecules/ChangelogCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { changelogService } from "@/services/api/changelogService";

const Changelog = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadChangelog();
  }, []);

  const loadChangelog = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await changelogService.getAll();
      setEntries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-success/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-success/20 to-green-600/20 rounded-full blur-xl opacity-30"></div>
            <h1 className="relative text-4xl sm:text-5xl font-bold bg-gradient-to-r from-success to-green-600 bg-clip-text text-transparent mb-4">
              Changelog
            </h1>
          </motion.div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest releases, new features, and improvements
          </p>
        </div>

        {/* Stats */}
        {!loading && !error && entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm mb-8"
          >
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-success/10 to-green-600/10 rounded-lg">
                  <ApperIcon name="Package" className="h-5 w-5 text-success" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{entries.length}</p>
                  <p className="text-sm text-gray-600">Total Releases</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg">
                  <ApperIcon name="Zap" className="h-5 w-5 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">
                    {entries.filter(e => e.category === "Features").length}
                  </p>
                  <p className="text-sm text-gray-600">New Features</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-info/10 to-blue-600/10 rounded-lg">
                  <ApperIcon name="Gauge" className="h-5 w-5 text-info" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">
                    {entries.filter(e => e.category === "Performance").length}
                  </p>
                  <p className="text-sm text-gray-600">Improvements</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content */}
        {loading && <Loading />}
        
        {error && (
          <Error 
            message={error} 
            onRetry={loadChangelog} 
          />
        )}
        
        {!loading && !error && entries.length === 0 && (
          <Empty
            title="No Updates Yet"
            message="We're working hard on new features and improvements. Check back soon for the latest updates!"
            actionText="View Roadmap"
            onAction={() => window.location.href = "/roadmap"}
            icon="Package"
          />
        )}
        
        {!loading && !error && entries.length > 0 && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {entries.map((entry, index) => (
              <ChangelogCard 
                key={entry.Id} 
                entry={entry} 
                index={index}
              />
            ))}
          </motion.div>
        )}

        {/* Footer */}
        {!loading && !error && entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <ApperIcon name="Bell" className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Want to get notified about new releases and feature updates?
              </p>
              <p className="text-sm text-gray-500">
                Follow our feedback board and roadmap to stay informed about upcoming features and improvements.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Changelog;